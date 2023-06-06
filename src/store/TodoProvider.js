import {useReducer} from 'react';

import TodoContext from './todo-context';

const defaultTodoState = {
    item: [],
    totalAmount: 0
}

const todoReducer = (state, action) => {
    if(action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingTodoItemIndex = state.item.findIndex(
            (item) => item.id === action.item.id
        );

        const existingTodoItem = state.items[existingTodoItemIndex];
        let updatedItems;
        if (existingTodoItem) {
            const updatedItem = {
                ...existingTodoItem,
                amount: existingTodoItem.amount + 1
            }
            updatedItems = [...state.items];
            updatedItems[existingTodoItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.items);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'UPDATE') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingTodoItemIndex = state.item.findIndex(
            (item) => item.id === action.item.id
        );

        const existingTodoItem = state.items[existingTodoItemIndex];
        let updatedItems;
        if (existingTodoItem) {
            const updatedItem = {
                ...existingTodoItem,
                amount: existingTodoItem.amount + 1
            }
            updatedItems = [...state.items];
            updatedItems[existingTodoItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.items);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
}

const TodoProvider = (props) => {
    return (
        
    );
}

export default TodoProvider;