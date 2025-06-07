import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import './App.css'
import { data } from './lib/data'
import Layout from './layout'
import { Checkbox } from './components/ui/checkbox'
import { Label } from './components/ui/label'


function App() {
  const path = data.sidebar.items.filter((item: any) => item.path === location.pathname)[0].label;

  return <Layout>
    <div className='flex flex-col items-start max-h-screen space-y-4 py-2 px-0 w-full'>
      <h1 className='text-3xl font-semibold mb-6'>{path}</h1>
      <div className='flex -mx-2'>
        {data.badges.map((badge: any, index: number) => (
          <div className='mx-2' key={index}>
            <Button variant="outline" size="lg"  >
              <badge.icon className='inline' />
              {badge.label}
            </Button>
          </div>
        ))}
      </div>
      {data.tasks.map((task: any, index: number) => (
        <Card className='w-full p-4' key={index}>
          <CardContent className='space-y-4 p-0'>
            <div className="flex items-center gap-4">
              <Checkbox id={`task-${index}`} className='h-5 w-5 border-slate-300 border-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600' />
              <Label htmlFor={`task-${index}`} className='text-md'>
                <div>
                  <span className='text-base font-medium'>
                    {task.title}
                  </span>
                  <div className='flex text-sm justify-start font-normal text-slate-400'>Work</div>
                </div>
              </Label>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </Layout>
}

export default App
