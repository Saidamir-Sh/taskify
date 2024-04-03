import './App.css';
import { Accordion, AccordionDetail, AccordionTitle } from './components/Elements/Accordion';
import { Button } from './components/Elements/Button';
import { Tabs } from './components/Elements/Tabs';
import { AutoComplete } from './components/Forms/AutoComplete';
import { Input } from './components/Forms/Input';
import mockData from './mockDatas';

function App() {

  return (
    <div className='flex flex-col gap-4 max-w-4xl mx-auto min-h-full'>
      <Button variant="primary" onClick={() => console.log('Clicked')}>Primary</Button>
      <Button variant="danger" onClick={() => console.log('Clicked')}>Primary</Button>

      <Tabs>
        <Tabs.Titles items={mockData.map(({id, title}) => ({id, title}))}/>
        <Tabs.Content items={mockData.map(({ id, content }) => ({id, content}))}/>
      </Tabs>

      <Accordion>
        <AccordionTitle index={1}>Introduction</AccordionTitle>
        <AccordionDetail index={1}>
          Welcome to our platform! In this introductory tab, you'll find information
        </AccordionDetail>

        <AccordionTitle index={2}>Features</AccordionTitle>
        <AccordionDetail index={2}>
        Explore the extensive features of our product in this tab. From advanced analytics to seamless integration, we've got you covered.
        </AccordionDetail>

        <AccordionTitle index={3}>Benefits</AccordionTitle>
        <AccordionDetail index={3}>
        Discover the numerous benefits of using our services. From increased productivity to cost savings, see how we can help your business grow.
        </AccordionDetail>
      </Accordion>

      <Input
        id="customInput"
        type="text"
        inputName="customInput"
        placeholder="Enter your password..."
        onChange={(e) => console.log(e.target.value)}
      />

      <AutoComplete
        id="customAutoComplete"
        placeholder='Countries...'
        options={["Algeria", "Bangladesh", "Congo", "Denmark"]}
      />

    </div>
  )
}

export default App
