import './App.css';
import { Button } from './components/Elements/Button';
import { Tabs } from './components/Elements/Tabs';
import mockData from './mockDatas';

function App() {

  return (
    <div>
      <Button variant="primary" onClick={() => console.log('Clicked')}>Primary</Button>
      <Button variant="danger" onClick={() => console.log('Clicked')}>Primary</Button>

      <Tabs>
        <Tabs.Titles items={mockData.map(({id, title}) => ({id, title}))}/>
        <Tabs.Content items={mockData.map(({ id, content }) => ({id, content}))}/>
      </Tabs>

    </div>
  )
}

export default App
