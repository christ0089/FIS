import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule, MatDividerModule, MatMenuModule, MatToolbarModule, MatDialogModule, MatListModule, MatTabsModule, MatCard, MatCardModule } from '@angular/material';
import { ResultProvider } from '../Services/mapService';
import { UserInfoService } from '../Services/UserInfo/user-info.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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



    ],
    exports: [
    ],
    providers: [ UserInfoService, ResultProvider],
    entryComponents: []
})
export class ComponentsModule { }