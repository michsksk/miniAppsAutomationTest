///<reference types="cypress"/>

describe("Test every mini apps", ()=> {
    beforeEach(()=>{
        cy.visit('https://qaplayground.dev/');
    });

    it("Find Spiderman in Table and assert his real name",() =>{
        cy.get('[href="/apps/dynamic-table/"]').click({force:true});
        cy.get('#tbody tr td:nth-child(1)').each(($el, index, $list)=> {
            if($el.text().includes('Spider-Man')){
                cy.get('#tbody tr td:nth-child(1)').eq(index).next().next().should('contain','Peter Parker');
            };
        });
    });

    it("Verify your account by typing number", ()=>{
        cy.get('[href="/apps/verify-account/"] > .card-content').click();
        cy.get('.code-container input').each(($el, index, $list)=>{
            cy.get($el).type('9');
        });
        cy.get('.info').contains('Success');
    });

    it("Add and remove tags and assert tags",()=>{
        cy.get('[href="/apps/tags-input-box/"] > .card-content').click();
        cy.get('.details').should('contain','8');
        cy.get('.content input').type('cypress{enter}');
        cy.get('.details').should('contain','7');
        cy.get('ul').contains('cypress').children().click();
        cy.get('.details').should('contain','8');
        cy.get('.content input').type('cypress, automation {enter}');
        cy.get('.details').should('contain','6');
        cy.get('.content input').then(()=>{
            var i;
            for(i=0; i <= 6;i++){
                cy.get('.content input').type(i+'1{enter}');
            };
        });
        cy.get('.details').should('contain','0');
        cy.get('button').contains('Remove All').click();
        cy.get('.details').should('contain','10');
        cy.get('.content input').type('1,2,3,4,5,6,7,8,9,10,11 {enter}');
        cy.get('.details').should('contain','0');
    });
    it("Dropdown menu test",()=>{
        cy.get('[href="/apps/multi-level-dropdown/"] > .card-content').click();
        cy.get('.navbar-nav > :nth-child(4)').click();
        cy.get('.dropdown > .menu > :nth-child(1)')
        .should('have.text','My Profile')
        .should('have.attr','href','#undefined');
        cy.get('.dropdown > .menu > :nth-child(2)')
        .should('have.text','Settings')
        .should('have.attr','href','#settings')
        .click();
        cy.url().should('include','/#settings');
        
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(1)')
        .should('have.text','My Tutorial')
        .should('have.attr','href','#main');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(2)')
        .should('have.text','HTML')
        .should('have.attr','href','#!HTML');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(3)')
        .should('have.text','CSS')
        .should('have.attr','href','#!CSS');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(4)')
        .should('have.text','JavaScript')
        .should('have.attr','href','#!JavaScript');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(5)')
        .should('have.text','Awesome!')
        .should('have.attr','href','#!Awesome');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(1)').click();
        cy.url().should('include','/#main')

        cy.get('.dropdown > .menu > :nth-child(3)')
        .should('have.attr','href','#animals')
        .contains('Animals')
        .click();
        cy.url().should('include','/#animals');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(1)')
        .should('have.text','Animals')
        .should('have.attr','href','#main');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(2)')
        .should('contain','Kangaroo')
        .should('have.attr','href','#!Kangaroo');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(3)')
        .should('contain','Frog')
        .should('have.attr','href','#!Frog');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(4)')
        .should('contain','Horse')
        .should('have.attr','href','#!Horse');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(5)')
        .should('contain','Hedgehog')
        .should('have.attr','href','#!Hedgehog');
        cy.get('.dropdown > .menu-secondary-enter-done > :nth-child(1)').click();
        cy.url().should('include','/#main')
        cy.get('.navbar-nav > :nth-child(4)').click();
        cy.url().should('include','/#home')
    });

    // it.only("Sortable List, Drag and drop", ()=>{
    //     cy.get('[href="/apps/sortable-list/"] > .card-content').click();
    //     cy.wait(1000);
    //     cy.get('[data-index="1"]').trigger('mousedown','center',{force:true});
    //     cy.get('[data-index="0"]').trigger('mousemove','center',{force:true}).trigger('mouseup',{force:true});

    //     // cy.get('#draggable-list').children().each(($el, $index, $list)=>{
    //     //     cy.get($el).children('.draggable').children('.person-name').invoke('text').then((text)=>{
    //     //         cy.log(text);
    //     //         if(text == 'Jeff Bezos'){
    //     //             cy.get($el).children('.draggable').trigger('mousedown','center');
    //     //             cy.get('[data-index="0"]').trigger('mouseover','center').trigger('mouseup');
    //     //         };
                
    //     //     });
    //     //});
    //     // cy.get('[data-index="0"] > .draggable > .person-name').invoke('text').then((text)=>{
    //     //     cy.log(text);
    //     // });
    // });

    // Jeff Bezos
    // Bill Gates
    // Warren Buffett
    // Bernard Arnault
    // Carlos Slim Helu 
    // Americano Ortega
    // Larry Ellison
    // Mark Zuckerberg
    // Michael Bloomberg
    // Larry Page

    it('Open new tab and assert text on it',()=>{
        cy.get('[href="/apps/new-tab/"] > .card-content').click();
        cy.get('#open').invoke('removeAttr','Target').click();
        cy.get('#wrapper').should('contain','Welcome to the new page!');
    });

    it('nested iframe',()=>{
        cy.get('[href="/apps/iframe/"] > .card-content').click();
        cy.get('#frame1').then(($el)=>{
            const frame2 = $el.contents().find('#frame2');
            cy.wrap(frame2).as('iframe1');
        });
        cy.get('@iframe1').then(($el)=>{
            const button = $el.contents().find('.btn');
            cy.wrap(button).then(($button)=>{
                cy.get($button).click();
            });
            const msg = $el.contents().find('#msg');
            cy.wrap(msg).then(($msg)=>{
                cy.get($msg).should('have.text','Button Clicked')
            });
        });
    });

    it("Shadow DOM",()=>{
        cy.get('[href="/apps/shadow-dom/"] > .card-content').click();
        cy.get('progress-bar')
        .shadow()
        .find('.btn-green-outline')
        .click();
        cy.get('progress-bar')
        .shadow()
        .find('.fill')
        .should('have.attr','style','width: 95%;');
    })

    it("Set each rate and assert image, text and number",()=>{
        cy.get('[href="/apps/rating/"] > .card-content').click();
        cy.starBeforeContentCheck('1','"I just hate it"');
        cy.starBeforeContentCheck('2','"I don\'t like it"');
        cy.starBeforeContentCheck('3','"This is awesome"');
        cy.starBeforeContentCheck('4','"I just like it"');
        cy.starBeforeContentCheck('5','"I just love it"');
    })

    it("Covered Element",()=>{
        cy.get('[href="/apps/covered/"] > .card-content').click();
        cy.get('#fugitive').click({force:true});
        cy.get('#info').should('contain','Mission accomplished');
    })

    it("Budget Tracker",()=>{
        cy.get('[href="/apps/budget-tracker/"] > .card-content').click();
        cy.addAndFillBudgetData('2024-10-08','Salary','income','5000');
        cy.get('.entries').children().should('have.length','1');
        cy.addAndFillBudgetData('2024-10-09','Food','expense','300');
        cy.get('.entries').children().should('have.length','2');
        cy.addAndFillBudgetData('2024-10-11','Phone','expense','700');
        cy.get('.entries').children().should('have.length','3');
        cy.get('.entries').children().eq(2).find('.delete-entry').click();
        cy.get('.entries').children().should('have.length','2');
        cy.addAndFillBudgetData('2024-10-11','Phone','expense','800');
        cy.get('.entries').children().should('have.length','3');    
    })
    
    it.only("Right click context menu",()=>{
        cy.get('[href="/apps/context-menu/"] > .card-content').click();
        cy.openRightClickMenuThenClickOnOptionAndAssert('Share','Twitter')
    })

})


