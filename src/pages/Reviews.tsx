
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Goal } from "@/components/GoalCard";
import { Calendar } from "lucide-react";

// Sample data
const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Complete React Project",
    description: "Finish building the GoalGlide application with all necessary features.",
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

interface ReviewSession {
  id: string;
  date: string;
  goalsReviewed: string[];
  summary: string;
}

// Sample review sessions
const mockReviewSessions: ReviewSession[] = [
  {
    id: "r1",
    date: "2025-04-25",
    goalsReviewed: ["1", "2"],
    summary: "Made good progress on the React project. Need to increase weekly running distance."
  },
  {
    id: "r2",
    date: "2025-04-18",
    goalsReviewed: ["1", "3"],
    summary: "Project timeline on track. Reading schedule needs adjustment."
  },
  {
    id: "r3",
    date: "2025-04-11",
    goalsReviewed: ["2", "3"],
    summary: "Running progress slow due to weather. Finished another book this week."
  }
];

const Reviews = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Get goals that need review (those with progress updates)
  const goalsNeedingReview = mockGoals.filter(goal => goal.progress > 0 && goal.progress < 100);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Review Sessions</h1>
        <p className="text-muted-foreground">Regularly review your goals to track progress.</p>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Reviews</TabsTrigger>
          <TabsTrigger value="past">Past Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="animate-scale-in">
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Weekly Review</h3>
                      <p className="text-sm text-muted-foreground">Today</p>
                    </div>
                  </div>
                  <Button asChild>
                    <Link to="/review/weekly">Start Review</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-lg font-semibold mt-6">Goals Needing Review</h3>
            {goalsNeedingReview.length === 0 ? (
              <p className="text-muted-foreground">No goals need reviewing at this time.</p>
            ) : (
              <div className="grid gap-4">
                {goalsNeedingReview.map((goal) => (
                  <Card key={goal.id}>
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{goal.title}</h3>
                            <Badge variant="outline">{goal.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Progress: {goal.progress}% • Due: {formatDate(goal.dueDate)}
                          </p>
                        </div>
                        <Button asChild variant="outline">
                          <Link to={`/review/${goal.id}`}>Review Goal</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="animate-scale-in">
          {mockReviewSessions.length === 0 ? (
            <p className="text-muted-foreground">No past review sessions found.</p>
          ) : (
            <div className="grid gap-4">
              {mockReviewSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <h3 className="font-semibold">Review Session • {formatDate(session.date)}</h3>
                        <Badge variant="secondary">{session.goalsReviewed.length} goals</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{session.summary}</p>
                      <div className="mt-2">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/review-session/${session.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reviews;
