export const title = {
    title: 'Title',
    dataIndex: 'link_name',
    render: (link_name) => <span>{link_name}</span>,
    key: 'link_name',
    sorter: (a,b) => a.link_name > b.link_name ? 1 : -1
}

export const url = {
    title: 'URL',
    dataIndex: 'link_address',
    render: (link_address) => <span><a href={ link_address } target="_blank" rel='noopener noreferrer'>{link_address}</a></span>,
    key: 'link_address',
}

export const hits = {
    title: 'Hits',
    dataIndex: 'hits',
    key: 'hits',
    sorter: (a,b) => a.hits - b.hits
}

export const health = {
    title: 'Health Status',
    dataIndex:'health',
    key: 'health',
    filters: [{
            text: "Up",
            value: true,
        }, {
            text: "Down",
            value: false,
        }
    ],
    render: (health) => <span> { health === true ? "Up" : "Down"} </span>, 
    onFilter: (value, record) => record.health === value,
}





