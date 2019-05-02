import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule, MatDividerModule, MatMenuModule, MatToolbarModule, MatDialogModule, MatListModule, MatTabsModule, MatCard, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        FormsModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatTabsModule,
        RouterModule,
        MatSelectModule,
        MatToolbarModule,
        MatDialogModule,
        MatDividerModule,
    ],
    declarations: [

        ProductListComponent

    ],
    exports: [
        ProductListComponent
    ],
    providers: [ ],
    entryComponents: []
})
export class ComponentsModule { }
