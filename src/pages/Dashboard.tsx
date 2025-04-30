
import { useState } from "react";
import GoalCard, { Goal } from "@/components/GoalCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryFilter from "@/components/CategoryFilter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
  },
  {
    id: "4",
    title: "Learn Spanish",
    description: "Achieve conversational Spanish fluency through daily practice.",
    progress: 30,
    category: "Learning",
    dueDate: "2025-09-01",
    createdAt: "2025-02-10"
  },
  {
    id: "5",
    title: "Build a Meditation Habit",
    description: "Meditate for 10 minutes every morning to improve focus and mindfulness.",
    progress: 90,
    category: "Health",
    dueDate: "2025-05-15",
    createdAt: "2025-04-01"
  },
  {
    id: "6",
    title: "Save for Vacation",
    description: "Set aside $200 monthly for a dream vacation next year.",
    progress: 60,
    category: "Finance",
    dueDate: "2025-11-30",
    createdAt: "2025-01-15"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories from goals
  const categories = [...new Set(mockGoals.map(goal => goal.category))];

  // Filter goals based on active tab, category, and search query
  const filteredGoals = mockGoals.filter(goal => {
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "completed" && goal.progress >= 100) || 
      (activeTab === "in-progress" && goal.progress < 100);
    
    const matchesCategory = 
      selectedCategory === null || goal.category === selectedCategory;
    
    const matchesSearch = 
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      goal.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your goals.</p>
        </div>
        <Link to="/create">
          <Button>Create New Goal</Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search goals..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="animate-scale-in">
          {filteredGoals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No goals found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="in-progress" className="animate-scale-in">
          {filteredGoals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No in-progress goals found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="animate-scale-in">
          {filteredGoals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No completed goals found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
