
export async function post(url, data) {
    return await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => JSON.parse(data))
    .catch(error=> {console.error(error)});
}


export async function getHTML(url) {
    return await fetch(url)
    .then(response => response.text())
    .then()
    .catch(error=> {console.error(error)});;
}