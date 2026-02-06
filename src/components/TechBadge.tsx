interface TechBadgeProps {
  name: string;
  description: string;
  color: string;
}

export default function TechBadge({ name, description, color }: TechBadgeProps) {
  return (
    <div className={`p-4 rounded-lg ${color} border border-current/20`}>
      <h4 className="font-semibold mb-1">{name}</h4>
      <p className="text-xs text-current/80">{description}</p>
    </div>
  );
}