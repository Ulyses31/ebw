import TagModel, {Tag} from "./tag.js";
import pkg, { Ref } from "@typegoose/typegoose";

const {getModelForClass, prop} = pkg;

class Recurso {
    @prop()
    public idEbw!: number;

    @prop()
    public name!: string;

    @prop()
    public fecha!: Date;

    @prop()
    public fechaPersa?: string;

    @prop({type: () => [String]})
    public enlaces?: string[]

    @prop({ref: () => Tag})
    public tags?: Ref<Tag>[]
}

