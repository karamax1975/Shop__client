import React, { useEffect, useState } from 'react';

import './selectCategory.css';
import SmallButton from '../../../Buttons/smallButton'

export default function SelectCategory({ action }) {

  const [openSelect, setOpenSelect] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [category, setCategory] = useState([]);
  const [nameNewCategory, setNameNewCategory] = useState('');
  const [flagAddNewCategory, setFlagAddNewCategory] = useState(false);
  const [styleSelect, setStyleSelect] = useState('');
  const [titleSelect, setTitleSelect] = useState('');
  const [styleTitle, setStyleTitle] = useState('');

  function userSelectCategory(name) {
    setTitleSelect(name);
    setOpenSelect(false)
  }


  const categoryList = category.map(category => {
    return <li key={category._id}
      onClick={() => {
        userSelectCategory(category.name)
        setStyleTitle('selected');
        action(category._id)
      }}>
      <span>{category.name}</span>
    </li>
  })


  useEffect(() => {
    openSelect
      ? setStyleSelect('active')
      : setStyleSelect('')
  }, [openSelect])


  async function fetchCategory() {
    const response = await fetch('/api/getCategory');
    const rezult = await response.json();
    return rezult.list
  }
  function resetNameCategory() {
    setNameNewCategory('')
    setAddCategory(false)
  }

  useEffect(() => {
    fetchCategory().then(listCategory => {
      setCategory(listCategory)
    })
    return () => {
      setStyleTitle('');
      setNameNewCategory('')
    }
  }, [])

  function action_AddCategory() {
    async function fetchAddNewCategory() {
      const response = await fetch('/api/addCategory', {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }),
        mode: 'same-origin',
        body: JSON.stringify({ name: nameNewCategory })

      })
      if (response.status === 200) {
        setFlagAddNewCategory(true)
      }
    }
    fetchAddNewCategory();
    action(nameNewCategory);
    setAddCategory(false);
  }

  useEffect(() => {
    if (flagAddNewCategory) {
      async function updateCategory() {
        const response = await fetch('/api/getCategory');
        if (response.status === 200) {
          const rezult = await response.json();
          if (rezult.list.length > 0) {
            // ставлю на первое место в массиве добавленную категорию
            let newArray = rezult.list.slice(0, rezult.list.length - 1);
            newArray = [rezult.list[rezult.list.length - 1], ...newArray];
            setCategory(newArray)
            return newArray[0];
          }
          else setCategory(rezult.list)
          return rezult.list[0]
        }
      }
      updateCategory().then(select => {
        setTitleSelect(select.name);
        setStyleTitle('selected');
      });
      setFlagAddNewCategory(false)
    }
  }, [flagAddNewCategory])



  const section_AddCategory = <div className='SelectCategory__addCategory'>
    <input onChange={(e) => setNameNewCategory(e.target.value)} />
    <SmallButton
      type='button'
      style='white reset square'
      iconType='reset'
      action={resetNameCategory}
    />
    <SmallButton
      type='button'
      style='sea square'
      name='Ok'
      action={action_AddCategory}
    />
  </div>


  return (
    <div className='SelectCategory'>
      <div className={`SelectCategory__wrapper ${styleSelect}`}>
        <div
          className={`SelectCategory__category ${styleTitle}`}
          onClick={() => setOpenSelect(!openSelect)}
        >
          {!titleSelect
            ? <span>Select product category</span>
            : <span>{titleSelect}</span>
          }
        </div>
        <SmallButton
          type='button'
          style='gray square'
          iconType='add'
          action={() => setAddCategory(true)}
        />
        <SmallButton
          type='button'
          style='sea square list-button'
          iconType='list'
          action={() => setOpenSelect(!openSelect)}
        />
      </div>
      {addCategory
        ? section_AddCategory
        : ''
      }
      <ul className='SelectCategory__list'>
        {openSelect
          ? categoryList
          : ''
        }
      </ul>
    </div>
  )
}