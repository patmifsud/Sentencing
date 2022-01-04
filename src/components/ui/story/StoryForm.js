import {Button, Textarea, Text } from '@chakra-ui/react'


function StoryForm(props) {
  const handleChange = (e) => {
    props.setInput(e.target.value)
  }

  return (
    <form 
      className="write-form" 
      onSubmit={props.onSubmit} 
      style={{opacity: props.submitting ? 0.4 : 1}}
    >
      <div class="left">
        <Text mb='2px'>What happens next?</Text>
        <Textarea 
          variant='flushed'
          placeholder={ `And then the....`}
          onChange={handleChange}
        />
      </div>
      <Button 
        isLoading={props.submitting}
        loadingText='Submitting'
        type="submit"
        size='lg' 
        className='write-button'
      >
        Submit!
      </Button>
    </form>
    );
  }

export default StoryForm;