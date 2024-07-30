import { useState, useEffect } from 'react'
import style from './List.module.css'
import axios from 'axios'

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

type ListPropsType = {
    searchTerm: string
    selectedUser: SearchUserType | null
    onUserSelect: ( user: SearchUserType ) => void
}

function List(props: ListPropsType) {

    // Локальный стейт для отображения списка
    const [users, setUsers] = useState<SearchUserType[]>([])

    // Делаем запрос на сервер чтобы установить стейт searchTerm и отобразить пользователей
    useEffect(() => {
        // отправляем запрос через axios, с типизацией.
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${props.searchTerm}`)
            .then((response) => setUsers(response.data.items))
    }, [props.searchTerm])

    return (
        <div>
            <ul>
                {users.map((user: any) => <li
                    className={props.selectedUser === user.login ? style.selected : ''}
                    onClick={() => props.onUserSelect(user.login)}
                    key={user.id}>{user.login}</li>)}
            </ul>
        </div>
    )
}

export default List