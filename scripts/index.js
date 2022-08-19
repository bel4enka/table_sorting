/**
 * Получаем данные
 */
getInitialData()
    .then(res => {
        createTable(res)

    })
    .catch(err => console.log(err))

/**
 * 
 * Создаёт тело таблицы с полученными данными
 */
const createTable = (data) => {

    const template = document.querySelector('#template');

    data.map(item => {
        const clone = template.content.cloneNode(true);
        const cells = clone.querySelectorAll('td');
        cells[0].textContent = item.userId
        cells[1].textContent = item.id
        cells[2].textContent = item.title
        cells[3].textContent = item.body
        template.parentNode.appendChild(clone)
    })
}
/**
 *
 * Сортировка 
 */
const getSort = ({target}) => {

    const row = target.closest('th')
    const order = row.dataset.order = -(row.dataset.order || -1);

    const index = [...row.parentNode.cells].indexOf(row);
    const collator = new Intl.Collator(['en', 'ru'], {numeric: true});
    const comparator = (index, order) => (a, b) => order * collator.compare(
        a.children[index].innerHTML,
        b.children[index].innerHTML
    );

    for (const tBody of row.closest('table').tBodies)
        tBody.append(...[...tBody.rows].sort(comparator(index, order)));

    for (const cell of row.parentNode.cells)
        cell.classList.toggle('sorted', cell === row);

    row.querySelector('.sort-img').classList.toggle('rotate')
};

document.querySelectorAll('.row__head')
    .forEach(tableTH => {
            tableTH.addEventListener('click', function (e) {
                getSort(e)
            })
        }
    )


document.querySelector("input").addEventListener('input', function (e) {
    const value = e.target.value
    const {length} = [...value]
    if (length >= 3) {
        setTimeout(() => {
            filterTable(value)
        }, 900)
    } else {
        filterTable('')
    }
})
/**
 *
 * Фильтрация данных в таблице
 */
function filterTable(value) {
    const phrase = value.toLowerCase()
    const table = document.querySelector("#table");
    const row = table.querySelectorAll(".row-body");

    row.forEach((item, rowIndex) => {
        const cells = row[rowIndex].querySelectorAll("td");
        let matches = false;

        for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
            if (cells[cellIndex]) {
                const content = cells[cellIndex].textContent;
                if (content.toLowerCase().includes(phrase)) {
                    matches = true;
                    break
                }
            }
        }
        if (matches) {
            row[rowIndex].classList.remove('hide')
        } else {
            row[rowIndex].classList.add('hide')
        }
    })

}