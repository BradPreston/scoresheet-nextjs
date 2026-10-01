import PillLink from "@/app/components/PillLink"

export default function Generic() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center px-4">
            <h1 className="text-6xl mb-6 text-center">Coming Soon</h1>
            <PillLink path="/" name="Go Back" />
        </main>
    )
}