import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WarrperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider6 from '../../assets/images/slider6.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavBarComponent/NavbarComponent'


const HomePage = () => {
  const arr = ['Mo hinh', 'Lego', 'Do choi', 'Test 1', 'Test 2', 'Test 3']
  return (
    <>
      <div style={{ padding: '0 120px' }}>
        <WarrperTypeProduct>
          {arr.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </WarrperTypeProduct>
      </div>
      
      <div id="container" style={{ background: '#efefef', padding: '0 120px' }}>
        <SliderComponent arrImages={[slider6, slider2, slider3]} />
        <div style={{ marginTop: '50px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <CardComponent />
        </div>
        <NavbarComponent></NavbarComponent>
      </div>

    </>
  )
}

export default HomePage