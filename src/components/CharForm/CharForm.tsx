import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseDescription, chooseComicsAppearedIn, chooseSuperPower } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { Button } from '@material-ui/core';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CharFormProps {
    id?:string;
    data?:{}
}

interface CharState {
    name: string;
    description: string;
    comics_appeared_in: number;
    super_power: string;
}

export const CharForm = (props:CharFormProps) => {

    const dispatch = useDispatch();
    let { charData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<CharState>(state => state.name)
    const description = useSelector<CharState>(state => state.description)
    const comics_appeared_in = useSelector<CharState>(state => state.comics_appeared_in)
    const super_power = useSelector<CharState>(state => state.super_power)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            // getData
            // setTimeout(()=>{ window.location.reload(); }, 1000);
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            dispatch(chooseComicsAppearedIn(data.comics_appeared_in))
            dispatch(chooseSuperPower(data.super_power))
            server_calls.create(store.getState())
            setTimeout(()=>{ window.location.reload(); }, 1000);
        }
    }

    return ( 
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Superhero Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Comics Appeared In</label>
                    <Input {...register('comics_appeared_in')} name="comics_appeared_in" placeholder="Comics Appeared In"/>
                </div>
                <div>
                    <label htmlFor="super_power">Super Power</label>
                    <Input {...register('super_power')} name="super_power" placeholder="Super Power"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}