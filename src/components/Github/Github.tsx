import { useState, useEffect } from 'react'
import style from './Github.module.css'
import Search from '../Search/Search'
import List from '../List/List'
import Ditails from '../Ditails/Ditails'

// По заданию форма с поиском пользователей, при вводе букв начинает выводить подходящий запрос. Нажимая на пользователя выводится информация о нем. По-умолчанию, дан массив ['Денис', 'Даша'], перебираем его методом map и выводим списком.

type SearchUserType = {
  login: string
  id: number
}

function Github() {

  // Локальный стейт для выбранного пользователя
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
  // Локальный стейт для кнопки поиска
  const initialSearchState = 'it-kamasutra'
  const [searchTerm, setSearchTerm] = useState(initialSearchState)

  // Меняем заголовок вкладки (tab title). Передаем в него функцию и массив(зависимости). Выполняется после того как компонент отрендерился. В массив зависимости передаем selectedUser, так как изменение зависит от него. Не указывая массив зависимости useEffect будет запускатся при каждом рендере компонента. 
  useEffect(() => {
    if (selectedUser) {
        // присваиваем выбранного пользователя, для отображения в заголовке страницы. При присваивании подчеркивает как ошибку, так как selectedUser в начале null (типизация useState), поэтому записывам через условие
        document.title = selectedUser.login
    }
}, [selectedUser])

  return (
    <div className={style.container}>
      <div>
        <Search
          value={searchTerm}
          onSubmit={(value: string) => setSearchTerm(value)}
        />
        <button onClick={() => setSearchTerm(initialSearchState)}>reset</button>
        <List 
          selectedUser={selectedUser}
          onUserSelect = {setSelectedUser}
          searchTerm={searchTerm}
        />
      </div>
      <div>
        <Ditails 
          selectedUser={selectedUser}
        />
      </div>
    </div>
  )
}

export default Github