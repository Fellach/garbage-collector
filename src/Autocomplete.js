const slugify = s => s.toLowerCase().replace(/[^a-z0-9]*/, '');

function Autocomplete({ items, label, onChange, value }) {
    const id = slugify(label);

    const onInput = ev => {
        if (items.includes(ev.target.value)) {
            onChange(ev.target.value)
        }
    };

    return (
        <>
            <input list={id} placeholder={label} onInput={onInput} defaultValue={value} />
            <datalist id={id}>
                { items.map(i => (<option key={slugify(i)} value={i} />)) }
            </datalist>
        </>
    );
}

export default Autocomplete;
