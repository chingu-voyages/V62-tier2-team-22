import { AuthStatus} from "@/components/Authentication/AuthButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
		<AuthStatus/>
    </div>
  );
}
