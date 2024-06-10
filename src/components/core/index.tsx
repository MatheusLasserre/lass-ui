import React from 'react'
type Props = {
    name: string;
}
export const Test:React.FC<Props> = ({name}) => {
    return <div>{name}</div>
};

