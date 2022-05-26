import pkg from '@typegoose/typegoose';
const { getModelForClass, prop } = pkg;

export class Tag {
    @prop()
    public name!: string;

    @prop()
    public href!: string;

    @prop()
    public idEbw!: number;
}

const TagModel = getModelForClass(Tag);

export default TagModel;
