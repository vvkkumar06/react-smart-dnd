import React, { ReactNode } from 'react';

type DraggableProps = {
    data?: any,
    id: string | number,
    children: ReactNode
}

const Draggable = (props: DraggableProps) => {
    const onDragStart = (e: any) =>{
        const dataKeys = props.data ? Object.keys(props.data) : [];
        if(dataKeys && dataKeys.length) {
            dataKeys.forEach((key: string ) => {
                e.dataTransfer.setData(key, props.data[key]);
            })
        }
        console.log(e)
    }

    return (
        <section draggable={true} onDragStart={onDragStart} key={props.id}>
            {props.children}
        </section>
    )
}

type DropzoneProps ={
    children: ReactNode,
    id: string | number,
    onDrop?: (data: any, dropzoneId?: string | number) => void,
    dataNames?: Array<string>
};

const Dropzone = (props: DropzoneProps) => {

    const onDragOver = (e: any) => {
        e.preventDefault();
    }

    const onDrop = (e: any) => {
        e.preventDefault();
        if(props.dataNames && props.onDrop) {
            const data: any = {};
            props.dataNames.map((name: string) => {
                data[name] = e.dataTransfer.getData(name);
            })
            props.onDrop(data, props.id);
        }

    }

    return (
        <section onDragOver={onDragOver} onDrop={onDrop} key={props.id}>
            {props.children}
        </section>
    )
}

type smartDndProps = {
    onDrop?: (data: any, dropzoneId?: string | number) => void // receive data in key value
    dataNames?: Array<string> //small cases 
}
export const useSmartDnd = (props: smartDndProps) => {

    return {
        Draggable,
        Dropzone: (dropProps: any) => <Dropzone id={dropProps.id} onDrop={props.onDrop} dataNames={props.dataNames}>{dropProps.children}</Dropzone>
    }
}
