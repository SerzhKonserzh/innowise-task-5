import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ChefHat,
  Star,
  Zap,
  Filter,
  Heart,
  ExternalLink,
} from 'lucide-react';
import type { Metadata } from 'next';
import { GithubIcon } from '@/components/ui/github';
import FeatureCard from '@/src/components/FeatureCard';
import TechBadge from '@/src/components/TechBadge';
import { NavMenuItem } from '@/src/components/NavMenuItem';

export const metadata: Metadata = {
  title: 'About RecipeHub - Discover Amazing Recipes',
  description: 'Learn more about RecipeHub, your ultimate recipe discovery platform built with modern technologies.',
  keywords: ['recipes', 'food', 'cooking', 'Next.js', 'React', 'TypeScript'],
  openGraph: {
    title: 'About RecipeHub',
    description: 'Discover the story behind RecipeHub - a modern recipe application',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-linear-to-r from-primary/10 to-secondary/10 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <ChefHat className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
              About RecipeHub
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Your ultimate destination for discovering, organizing, and enjoying amazing recipes from around the world
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                50+ Recipes
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Lightning Fast
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What is RecipeHub?</h2>
              <Separator className="max-w-md mx-auto" />
            </div>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  RecipeHub is a modern, feature-rich recipe discovery application designed for food enthusiasts, 
                  home cooks, and culinary adventurers. Built with cutting-edge technologies, our platform offers a 
                  seamless experience for finding, filtering, and saving your favorite recipes.
                </p>
                
                <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                  Whether you're looking for quick weeknight dinners, healthy meal prep ideas, or indulgent desserts, 
                  RecipeHub curates a diverse collection of recipes to inspire your next culinary creation. Our 
                  intuitive interface and powerful filtering capabilities make it easy to find exactly what you're 
                  looking for in seconds.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover what makes RecipeHub the perfect companion for your cooking journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Filter className="h-8 w-8 text-primary" />}
                title="Smart Filtering"
                description="Filter recipes by meal type, cuisine, difficulty, calories, and tags to find your perfect match."
              />
              
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Lightning Fast"
                description="Built with Next.js for optimal performance and instant page transitions."
              />
              
              <FeatureCard
                icon={<Star className="h-8 w-8 text-primary" />}
                title="Save Favorites"
                description="Bookmark your favorite recipes and access them anytime from your personal collection."
              />
              
              <FeatureCard
                icon={<ChefHat className="h-8 w-8 text-primary" />}
                title="Detailed Recipes"
                description="Step-by-step instructions, ingredient lists, and nutrition facts for every recipe."
              />
              
              <FeatureCard
                icon={<Heart className="h-8 w-8 text-primary" />}
                title="Responsive Design"
                description="Beautiful experience on any device - desktop, tablet, or mobile."
              />
              
              <FeatureCard
                icon={<ExternalLink className="h-8 w-8 text-primary" />}
                title="API Powered"
                description="Real-time data from DummyJSON API with intelligent caching for reliability."
              />
            </div>
          </section>

          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built with modern web technologies for exceptional performance and developer experience
              </p>
            </div>

            <Card className="border-2 border-primary/20 py-2 sm:py-6">
              <CardContent className="p-2 sm:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  <TechBadge
                    name="Next.js 14"
                    description="React framework with App Router"
                    color="bg-blue-500/10 text-blue-500"
                  />
                  
                  <TechBadge
                    name="TypeScript"
                    description="Type-safe development"
                    color="bg-blue-700/10 text-blue-700"
                  />
                  
                  <TechBadge
                    name="Zustand"
                    description="State management"
                    color="bg-purple-500/10 text-purple-500"
                  />
                  
                  <TechBadge
                    name="shadcn/ui"
                    description="Beautiful UI components"
                    color="bg-gray-500/10 text-gray-500"
                  />
                  
                  <TechBadge
                    name="Tailwind CSS"
                    description="Utility-first styling"
                    color="bg-cyan-500/10 text-cyan-500"
                  />
                  
                  <TechBadge
                    name="Lucide React"
                    description="Icon library"
                    color="bg-emerald-500/10 text-emerald-500"
                  />
                  
                  <TechBadge
                    name="Axios"
                    description="HTTP client"
                    color="bg-amber-500/10 text-amber-500"
                  />
                  
                  <TechBadge
                    name="SSG/ISR"
                    description="Static generation"
                    color="bg-indigo-500/10 text-indigo-500"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <Separator className="max-w-md mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-primary" />
                    Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To make cooking accessible, enjoyable, and inspiring for everyone. We believe that great food 
                    brings people together and that everyone deserves access to quality recipes regardless of their 
                    skill level or dietary preferences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the go-to platform for recipe discovery worldwide, continuously improving our 
                    technology and expanding our collection to serve diverse culinary traditions and dietary needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="text-center">
            <Card className="border-2 border-primary/20 bg-linear-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4">Ready to Start Cooking?</h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of food lovers who discover new recipes every day with RecipeHub
                </p>
                
                <Button size="lg" className="text-sm sm:text-lg px-0 py-0 sm:px-8 sm:py-6" asChild>
                  <a href="/">
                    Explore Recipes Now
                    <ExternalLink className="hidden sm:block ml-2 h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </section>

          <footer className="text-center py-12">
            <div className="flex justify-center gap-6 mb-6">
              <NavMenuItem
                href="https://github.com/SerzhKonserzh"
                icon={<GithubIcon className="h-6 w-6" />}
                name='Github'
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RecipeHub. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Built with ❤️ using Next.js, TypeScript, and shadcn/ui
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}