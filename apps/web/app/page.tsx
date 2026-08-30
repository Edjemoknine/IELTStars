import { Button } from '@/components/ui/button';
import type { IELTSModule } from '@ielts/types';

const moduleName: IELTSModule = 'speaking';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold text-red-500">IELTS Platform</h1>
      <p>Current module: {moduleName}</p>
      <Button variant="default" size="lg">
        Start {moduleName} module
      </Button>
    </main>
  );
}
