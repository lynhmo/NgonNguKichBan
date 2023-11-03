import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WarrperTypeProduct } from './style'

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
      HomePage
    </div>
  )
}

export default HomePage