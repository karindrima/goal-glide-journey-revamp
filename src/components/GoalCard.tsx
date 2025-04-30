
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import ProgressRing from "./ProgressRing";

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: string;
  dueDate: string;
  createdAt: string;
}

interface GoalCardProps {
  goal: Goal;
  className?: string;
}

const GoalCard = ({ goal, className }: GoalCardProps) => {
  const dueDate = new Date(goal.dueDate);
  const formattedDueDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(dueDate);

  return (
    <Card className={cn("overflow-hidden goal-card", className)}>
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div 
            className={cn(
              "h-2",
              goal.progress >= 100 ? "bg-green-500" :
              new Date() > dueDate && goal.progress < 100 ? "bg-red-500" :
              "bg-primary"
            )}
          />
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full">
                {goal.category}
              </span>
              <ProgressRing progress={goal.progress} size={36} />
            </div>
            <h3 className="font-semibold text-lg">{goal.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {goal.description}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Due: {formattedDueDate}
              </span>
              <Link to={`/review/${goal.id}`}>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
