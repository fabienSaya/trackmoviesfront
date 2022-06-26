import { StarsPipe } from './stars.pipe';

describe('StarsPipe', () => {
  it('creation d une instance', () => {
    const pipe = new StarsPipe();
    expect(pipe).toBeTruthy();
  });

  it('StarsPipe doit retourner un nombre d etoile correspondant à la notre de l oeuvre', () => {
    const pipe = new StarsPipe()
    expect(pipe.transform(2)).toBe('<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>')
  })
});
