/** @jsx html */

import test from 'tape';
import { html } from './snabbdom-jsx';

test('jsx -> html vnode', (assert) => {
  
  function callback() {};
  const style = { fontWeight: 'bold' };
  const div1 = 
    <div classNames="c1 c2">
      <label htmlFor="someid">label</label>
    </div>;
  
  assert.equal(div1.sel, 'div.c1.c2');
  assert.equal(div1.data.ns, undefined);
  assert.deepEqual(div1.children, [
    {
      sel: 'label',
      data: {
        ns: undefined,
        props: { htmlFor: 'someid' }
      },
      children: [{ text: 'label'}]
    }  
  ]);
  
  const div2 = 
    <div>
      <input 
        type="text" 
        style={style}
        style-color='red'
        on-click={callback}/>
    </div>;
    
  assert.deepEqual(div2.children[0], {
    sel: 'input',
    data: {
      ns: undefined,
      props: { type: 'text' },
      on: { click: callback },
      style: { fontWeight: 'bold', color: 'red' }
    },
    children: []
  });

  assert.end();
});

test('jsx components', (assert) => {
  
  const MyDiv = ({color, fontWeight}) =>
    <div
      style={ ({color, fontWeight}) }>
    </div>;
    
  const mydiv1 = <MyDiv color="red" fontWeight="bold" />;
  
  assert.deepEqual(mydiv1,
    {
      sel: 'div',
      data: {
        ns: undefined,
        style: { fontWeight: 'bold', color: 'red' }
      },
      children: []
    }  
  );
  

  assert.end();
});