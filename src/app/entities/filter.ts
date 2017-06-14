import { ICheckBoxFilter, ISelectValueFilter } from "app/entities/iFilter";

export class SelectValueFilter implements ISelectValueFilter {
    SelectedValue: number;
    FilterValue: number[];
    FilterName: string;

    constructor(FilterName: string,FilterValue: number[],SelectedValue: number){
        this.FilterName = FilterName;
        this.FilterValue = FilterValue;
        this.SelectedValue = SelectedValue;
    };
}

export class CheckBoxFilter implements ICheckBoxFilter {
    FilterName: string;
    FilterVisible: boolean;

    constructor(FilterName: string,FilterVisible: boolean){
        this.FilterName = FilterName;
        this.FilterVisible = FilterVisible;
    };
}