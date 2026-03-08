export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
