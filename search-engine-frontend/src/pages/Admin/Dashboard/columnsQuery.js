export const title = {
    title: 'Title',
    dataIndex: 'title',
    render: (title) => <span>{ title }</span>,
    key: 'title',
    sorter: (a,b) => a.title > b.title ? 1 : -1
}

export const hits = {
    title: 'Hits',
    dataIndex: 'hits',
    key: 'hits',
    sorter: (a,b) => a.hits - b.hits
}