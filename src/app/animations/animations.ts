import { trigger, transition, animate, style, state, keyframes, animation, useAnimation } from '@angular/animations';


   //configuracion de distintos triggers de animaciones usadas en el portfolio

    export let fadeslow= trigger('fadeslow', [
        state('void',style({opacity: 0})),
        transition(':enter, :leave', [
          animate(1100)
        ])
      ]);

      export let fade = trigger('fade', [
       
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms ease-in') 
          
        ]
        
        ),
        transition(':leave', [
          animate('500ms ease-out'), 
          style({opacity: 0})
        ]
       
        )
      ]);
    
      export let fadeReallySlow= trigger('fadeReallySlow', [
        state('void',style({opacity: 0})),
        transition(':enter, :leave', [
          animate(5000)
        ])
      ]);

    export let slideTop = trigger('slideTop', [
        transition(':enter', [
            style({transform: 'translateY(-2000px)'}),
            animate('1s ease-out')
        ])
        ,
        transition(':leave', [
          animate(2000, 
          style({
              transform: 'translateY(-2000px)'}
            ))])
          ]);

    export let slideLeft = trigger('slideLeft', [
        transition(':enter', [
          style({
            transform: 'translateX(-1000%)',
            opacity: 0}),
          animate('1s  ease-in-out')
        ]),
        transition(':leave', [
          animate(1000,
            style ({
                opacity: 0
            }))
        ])
    ]);

    export let slideRight = trigger('slideRight', [
      transition(':enter', [
        style({
          transform: 'translateX( 200%)',
          opacity: 0}),
        animate('0.5s  ease-out')
      ]),
      transition(':leave', [
        animate(500,
          style ({
              transform: 'translateY(200%)'
          }))
      ])
  ]);



    export let zoomInDown = trigger('zoomInDown', [
      transition(':enter', [
        animate('3s ease', keyframes([
          style({
                offset: .2,
                opacity: 0,
                transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)'
              }),
          style({
                offset: .5,
                opacity: 0.5,
                transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 700px, 0)',                
              }),
          style({
                offset: .9,
                opacity: 1,
                transform: 'scale3d(1, 1, 1) translate3d(0, 0px, 0)',                
              }),
            ]))])]);

    export let tada = trigger('tada', [
      transition(':enter', [
        animate('1s ease', keyframes([
          style({
              offset: 0,
              transform: 'scale3d(1, 1, 1)',
          }),
          style({
              offset: 0.2,
              transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)'
          }),
          style({
              offset: 0.5,
              transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
          }),
          style({
            offset: 0.8,
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
          }),
          style({
            offset: 0.99999,
            ransform: 'scale3d(1, 1, 1)'
          }),

        ]))
      ])
    ]);
              
         
          