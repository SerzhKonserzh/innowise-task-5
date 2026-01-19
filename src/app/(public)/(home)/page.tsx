import { Recipe } from "./Recipe";

export default function Home() {
  return (
    <Recipe recipe={{ text: "Hello, world", author: "John Doe" }} />
  );
}
