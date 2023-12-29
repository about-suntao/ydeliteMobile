import http from '../axios'

export function submitForm(params) {
    return http.post(`/icon/PersonalDetails/add`, params)
}
