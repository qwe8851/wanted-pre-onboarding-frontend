import React from 'react';

const TodoContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    editItem: (id) => { },
    removeItem: (id) => { },
});

export default TodoContext;