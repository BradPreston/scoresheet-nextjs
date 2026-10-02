import Link from "next/link";

type Props = {
  name: string;
  path: string;
};

export default function PillLink({ name, path }: Props) {
  return (
    <Link href={path} className="bg-primary flex w-fit px-5 py-2 rounded-full text-foreground border border-primary hover:bg-transparent dark:text-background dark:hover:text-primary transition">
      {name}
    </Link>
  );
}
