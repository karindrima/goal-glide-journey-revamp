
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ProgressRing from "@/components/ProgressRing";
import { Goal } from "@/components/GoalCard";

// Sample data
const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Complete React Project",
    description: "Finish building the GoalGlide application with all the necessary features.",
    progress: 75,
    category: "Work",
    dueDate: "2025-05-30",
    createdAt: "2025-04-15"
  },
  {
    id: "2",
    title: "Run 10km Weekly",
    description: "Build up endurance by running at least 10km every week.",
    progress: 50,
    category: "Health",
    dueDate: "2025-06-15",
    createdAt: "2025-03-20"
  },
  {
    id: "3",
    title: "Read 12 Books This Year",
    description: "Read one book each month to expand knowledge and perspective.",
    progress: 25,
    category: "Personal",
    dueDate: "2025-12-31",
    createdAt: "2025-01-01"
  }
];

const ReviewGoal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the goal based on id
  const goal = mockGoals.find(g => g.id === id);
  
  const [progress, setProgress] = useState(goal ? goal.progress : 0);
  const [notes, setNotes] = useState("");
  
  if (!goal) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Goal not found</h1>
        <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
      </div>
    );
  }
  
  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save the updated goal and review to a database
    toast.success("Goal progress updated successfully!");
    
    // Redirect back
    navigate(-1);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 text-muted-foreground"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <h1 className="text-3xl font-bold tracking-tight mb-6">Review Goal</h1>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{goal.title}</CardTitle>
            <CardDescription>
              Category: {goal.category} • Due: {new Date(goal.dueDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p>{goal.description}</p>
            
            <div className="border rounded-lg p-6 bg-secondary/20">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <ProgressRing progress={progress} size={80} strokeWidth={8} />
                
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm font-medium">Current Progress: {progress}%</p>
                    <Slider
                      defaultValue={[progress]}
                      max={100}
                      step={5}
                      value={[progress]}
                      onValueChange={handleProgressChange}
                      className="my-4"
                    />
                  </div>
                  
                  <div className="grid grid-cols-5 text-xs text-muted-foreground">
                    <span>0%</span>
                    <span className="text-center">25%</span>
                    <span className="text-center">50%</span>
                    <span className="text-center">75%</span>
                    <span className="text-right">100%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Review Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Add notes about your progress, challenges, or next steps..."
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit">Save Review</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ReviewGoal;
