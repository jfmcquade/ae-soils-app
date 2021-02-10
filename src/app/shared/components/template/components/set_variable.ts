import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "scripts/types";

@Component({
    selector: "plh-tmpl-animated-section-group",
    template: ``
})
export class TmplSetVariableComponent implements OnInit {

    @Input() row: FlowTypes.TemplateRow;
    @Input() template: FlowTypes.Template;

    ngOnInit() {
        console.log("Ng on init set variable", this.row, this.template);
        if (this.row && this.template) {
            if (!this.template._local_variables) {
                this.template._local_variables = {};
            }
            this.template._local_variables[this.row.name] = this.row.value;
        }
    }
}