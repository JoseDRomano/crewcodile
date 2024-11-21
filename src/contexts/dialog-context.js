import { AddUserDialog, EditUserDialog } from '@/sections/students/add-dialog';
import React, {createContext, useContext, useState} from 'react';

const DialogContext = createContext();

export const DialogProvider = ({children}) => {
    const [open, setOpen] = useState(false);

    const [type, setType] = useState({});

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const setDialogContent = (content) => {
        setType(content);
        openDialog();

    }


    const getType = () => {
        return type;
    }


    const contextValue = {
        open,
        openDialog,
        closeDialog,
        setDialogContent,
        getType,
        setType
    };

    return (
        <DialogContext.Provider  value={contextValue}>
            {children}
        </DialogContext.Provider>
    );
};

// Um hook customizado para acessar o contexto
export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};
