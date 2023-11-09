import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WarrperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider6 from '../../assets/images/slider6.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'


const HomePage = () => {
  const arr = ['Mo hinh', 'Lego', 'Do choi', 'Test 1', 'Test 2', 'Test 3']
  return (
    <div style={{ padding: '0 120px' }}>
      <WarrperTypeProduct>

        {arr.map((item) => {
          return (
            <TypeProduct name={item} key={item} />
          )
        })}
      </WarrperTypeProduct>
      <SliderComponent arrImages={[slider6, slider2, slider3]} />
      under
    </div>
  )
}

export default HomePage