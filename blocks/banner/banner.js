export default function decorate(block){


    [...block.children].forEach((row) => {
      [...row.children].forEach((col) => {
        const bannerpic = col.querySelector('picture');
        const bannertitle = col.querySelector('p');
      
//Banner Image
        if (bannerpic) {
          const bannerpicWrapper = bannerpic.closest('div');
          if (bannerpicWrapper && bannerpicWrapper.children.length === 1) {
            bannerpicWrapper.classList.add('columns-bannerimg-col');
          }
        }
//Banner Title
        if (bannertitle) {
            const bannertitleWrapper = bannertitle.closest('div');
            if (bannertitleWrapper && bannertitleWrapper.children.length === 1) {
              bannertitleWrapper.classList.add('columns-bannertitle-col');
            }
          }
      });
    });
}