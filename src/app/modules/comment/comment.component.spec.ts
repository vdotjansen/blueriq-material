import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqSession } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { FormControlModule } from '../form-controls/form-control.module';
import { CommentComponent } from './comment.component';
import { CommentModule } from './comment.module';

describe('CommentComponent', () => {

  let container: ContainerTemplate;
  let component: ComponentFixture<CommentComponent>;
  let session: BlueriqTestSession;
  let commentField: FieldTemplate;
  let commentButton: ButtonTemplate;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [TextAreaComponent],
      // providers: [BlueriqComponents.register([TextAreaComponent])],
      imports: [
        BlueriqTestingModule,
        CommentModule,
        FormControlModule
      ]
    });
  }));

  beforeEach(() => {
    commentField = FieldTemplate.text('somename').explainText('explaining');
    commentButton = ButtonTemplate.create('klik').caption('klikme');
    container = ContainerTemplate.create()
    .contentStyle('storecomment')
    .children(
      commentField,
      commentButton
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(CommentComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the textarea', () => {
    expect(component.nativeElement.querySelector('bq-text-area')).toBeTruthy();
  });

  it('should render the button', () => {
    // SUT
    const button = component.nativeElement.querySelector('button');

    // Verify
    expect(button).toBeTruthy();
    expect(button.querySelector('span').innerHTML.trim()).toBe('klikme');
  });

  it('button click should not have been called session pressed when value is empty', () => {
    // Init
    spyOn(BlueriqSession.prototype, 'pressed');
    const button = component.nativeElement.querySelector('button');

    // SUT
    button.click();
    component.detectChanges();

    // Verify
    expect(BlueriqSession.prototype.pressed).not.toHaveBeenCalled();
  });

  it('button click should call session pressed when value is set', () => {
    // Init
    spyOn(BlueriqSession.prototype, 'pressed');
    const button = component.nativeElement.querySelector('button');
    session.update(
      commentField.value('this is my first comment')
    );

    // SUT
    button.click();
    component.detectChanges();

    // Verify
    expect(BlueriqSession.prototype.pressed).toHaveBeenCalled();
  });
});
