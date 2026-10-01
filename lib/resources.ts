import "server-only";
import ipaddr from "ipaddr.js";
import { lookup } from "node:dns";
import { Agent, fetch as resourceFetch } from "undici";

export function isPublicIp(address: string): boolean {
  try {
    return ipaddr.process(address).range() === "unicast";
  } catch {
    return false;
  }
}

export function getPublicResourceUrl(value: string): URL | null {
  try {
    const url = new URL(value);

    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      (url.port && url.port !== "443")
    ) {
      return null;
    }

    const hostname = url.hostname.replace(/^\[|\]$/g, "");

    if (ipaddr.isValid(hostname) && !isPublicIp(hostname)) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}



function isYouTubeUrl(url: URL): boolean {
  return [
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "music.youtube.com",
    "youtu.be",
    "www.youtu.be",
    "youtube-nocookie.com",
    "www.youtube-nocookie.com",
  ].includes(url.hostname.toLowerCase());
}

function getYouTubeVideoId(url: URL): string | null {
  const parts = url.pathname.split("/").filter(Boolean);

  const id = url.hostname.endsWith("youtu.be")
    ? parts[0]
    : url.pathname === "/watch"
      ? url.searchParams.get("v")
      : ["shorts", "embed", "live"].includes(parts[0])
        ? parts[1]
        : null;

  return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
}

export async function isResourceAvailable(value: string): Promise<boolean> {
  let url = getPublicResourceUrl(value);
  if (!url) return false;

  const dispatcher = new Agent({
    connect: {
      timeout: 6000,

      lookup(hostname, options, callback) {
        lookup(hostname, { all: true }, (error, addresses) => {
          if (error) {
            callback(error, []);
            return;
          }

          if (
            !addresses.length ||
            addresses.some((item) => !isPublicIp(item.address))
          ) {
            callback(new Error("Non-public resource address"), []);
            return;
          }

          const matchingAddresses = options.family
            ? addresses.filter((item) => item.family === options.family)
            : addresses;

          if (!matchingAddresses.length) {
            callback(new Error("No matching address"), []);
            return;
          }

          if (options.all) {
            callback(null, matchingAddresses);
          } else {
            const address = matchingAddresses[0];
            callback(null, address.address, address.family);
          }
        });
      },
    },
  });

  const signal = AbortSignal.timeout(6000);

  try {
    for (let redirects = 0; redirects <= 3; redirects++) {
        if (isYouTubeUrl(url)) {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return false;

  const metadataUrl = new URL("https://www.youtube.com/oembed");

  metadataUrl.searchParams.set(
    "url",
    `https://www.youtube.com/watch?v=${videoId}`
  );
  metadataUrl.searchParams.set("format", "json");

  const metadataResponse = await resourceFetch(metadataUrl, {
    method: "GET",
    redirect: "error",
    dispatcher,
    signal,
  });

  if (!metadataResponse.ok) {
    await metadataResponse.body?.cancel();
    return false;
  }

  const metadata: unknown = await metadataResponse.json();

  return (
    typeof metadata === "object" &&
    metadata !== null &&
    "type" in metadata &&
    metadata.type === "video" &&
    "title" in metadata &&
    typeof metadata.title === "string" &&
    metadata.title.trim().length > 0
  );
}
      let response = await resourceFetch(url, {
        method: "HEAD",
        redirect: "manual",
        dispatcher,
        signal,
      });

      if (response.status === 405 || response.status === 501) {
        await response.body?.cancel();

        response = await resourceFetch(url, {
          method: "GET",
          redirect: "manual",
          dispatcher,
          signal,
          headers: { Range: "bytes=0-1023" },
        });
      }

      const status = response.status;
      const location = response.headers.get("location");

      await response.body?.cancel();

      if ([301, 302, 303, 307, 308].includes(status)) {
        if (!location || redirects === 3) return false;

        url = getPublicResourceUrl(new URL(location, url).href);
        if (!url) return false;

        continue;
      }

      return status >= 200 && status < 300;
    }

    return false;
  } catch {
    return false;
  } finally {
    await dispatcher.destroy();
  }
}