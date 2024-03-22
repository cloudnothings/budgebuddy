
import Hero from "./hero";
import { redirectFromHomepage } from "@/data-layer/budgets";

export default async function Home() {
  await redirectFromHomepage();
  return (
    <Hero />
  )
}

