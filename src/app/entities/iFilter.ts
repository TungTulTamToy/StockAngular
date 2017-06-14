export interface IFilter {
    FilterName:string;
}

export interface ICheckBoxFilter extends IFilter {
    FilterVisible:boolean;
}

export interface ISelectValueFilter extends IFilter {
    FilterValue:number[];
    SelectedValue:number;
}