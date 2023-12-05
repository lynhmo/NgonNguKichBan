import React from 'react'
import { WrapperContent, WrapperLableText, WrapperNav, WrapperPrice, WrapperTextValues } from './style'
import { Checkbox, Rate } from 'antd'

const NavbarComponent = () => {
  const onChange = () => { }

  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option) => {
          return (
            <WrapperTextValues key={option}>{option}</WrapperTextValues>
          )
        })
      case 'checkbox':
        return (
          <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column' }} onChange={onChange} >
            {options.map((option) => {
              return (
                <Checkbox key={option.value} value={option.value} style={{ margin: '0' }}>{option.label}</Checkbox>
              )
            })}
          </Checkbox.Group>
        )
      case 'star':
        return (
          options.map((option) => {
            return (
              <Rate style={{ fontSize: '16px' }} disabled defaultValue={option} key={option} />
            )
          })
        )
      case 'price':
        return (
          options.map((option) => {
            return (
              <WrapperPrice key={option}>{option}</WrapperPrice>
            )
          })
        )
      default:
        return {}
    }
  }

  return (
    <WrapperNav>
      <WrapperLableText>
        Hãng
      </WrapperLableText>
      <WrapperContent>
        {renderContent('text', ['Lego', 'Minecraft', 'Marvel'])}
      </WrapperContent>
      <WrapperLableText>
        Loại
      </WrapperLableText>
      <WrapperContent>
        {renderContent('checkbox', [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
          { value: 'c', label: 'C' },
        ])}
      </WrapperContent>
      <WrapperLableText>
        Đánh giá
      </WrapperLableText>
      <WrapperContent>
        {renderContent('star', [5, 4, 3])}
      </WrapperContent>
      <WrapperLableText>
        Giá tiền
      </WrapperLableText>
      <WrapperContent>
        {renderContent('price', ['Dưới 100.000 vnđ', 'dưới 300.000 vnđ', ' dưới 1 triệu'])}
      </WrapperContent>
    </WrapperNav>
  )
}

export default NavbarComponent