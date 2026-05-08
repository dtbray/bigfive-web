interface ViewCounterProps {
  postId: string;
}

export function ViewCounter({ postId }: ViewCounterProps) {
  return <p>{postId.replace('.md', '')}</p>;
}
