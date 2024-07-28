import { useEffect, useState } from 'react'
import style from './Github.module.css'
import axios from 'axios'

// По заданию форма с поиском пользователей, при вводе букв начинает выводить подходящий запрос. Нажимая на пользователя выводится информация о нем. По-умолчанию, дан массив ['Денис', 'Даша'], перебираем его методом map и выводим списком.

// Типизируум ответ с сервера, оттуда прийдут пользователи. 
// Типизация отдельного пользователя из массива по логину...
type SearchUserType = {
  login: string
  id: number
}
// массив пользователей в ответе от сервера
type SearchResult = {
  items: SearchUserType[]
}

// Типизация пользователя
type UserType = {
  login: 'string'
  id: number
  avatar_url: 'string'
  followers: 'number'
}

function Github() {


  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [userDitails, setUserDitails] = useState<null | UserType>(null)
  const [users, setUsers] = useState<SearchUserType[]>([])
  const [temporarySearch, setTemporarySearch] = useState('it-kamasutra')
  const [searchTerm, setSearchTerm] = useState('it-kamasutra')

  // передаем в него функцию и массив(зависимости). Выполняется после того как компонент отрендерился. В массив зависимости передаем selectedUser, так как изменение зависит от него. Не указывая массив зависимости useEffect будет запускатся при каждом рендере компонента. 
  useEffect(() => {
    if (selectedUser) {
      // присваиваем выбранного пользователя, для отображения в заголовке страницы. При присваивании подчеркивает как ошибку, так как selectedUser в начале null (типизация useState), поэтому записывам через условие
      document.title = selectedUser
    }
  }, [selectedUser])

  // хотим получить пользователей с сервера. Для этого создаем новый useEffect, так как это совершенно другая задача.
  useEffect(() => {
    // отправляем запрос через axios, с типизацией.
    axios
      .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
      .then((response) => setUsers(response.data.items))
  }, [searchTerm])

  useEffect(() => {
    // отправляем запрос через axios, с типизацией.
    if (!!selectedUser) {
      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser}`)
        .then((response) => setUserDitails(response.data))
    }
  }, [selectedUser])

  return (
    <div className={style.container}>
      <div>
        <div>
          <input placeholder="search" value={temporarySearch} onChange={(e) => setTemporarySearch(e.currentTarget.value)} /> <button onClick={() => {
            setSearchTerm(temporarySearch)
          }}>find</button>
        </div>
        <ul>
          {users.map((user) => <li
            className={selectedUser === user.login ? style.selected : ''}
            onClick={() => setSelectedUser(user.login)}
            key={user.id}>{user.login}</li>)}
        </ul>
      </div>
      <div>
        <h2>Username</h2>
        {userDitails && <div>
            <img src={userDitails.avatar_url} alt="img" />
          </div>}
          <br />
          {userDitails?.login}, followers: {userDitails?.followers}
      </div>
    </div>
  )
}

export default Github