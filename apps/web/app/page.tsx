import type { IELTSModule } from '@ielts/types';

const moduleName: IELTSModule = 'speaking';

export default function Home() {
  return (
    <main>
      <h1>IELTS Platform</h1>
      <p>Current module: {moduleName}</p>
    </main>
  );
}
