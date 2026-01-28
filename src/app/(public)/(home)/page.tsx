import { Recipe } from "./Recipe";

export default function Home() {
  return (
    <Recipe recipe={{ id: 1,text: "Hello, world", author: "John Doe" }} />
  );
}
